import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { Event, EventForm } from '../types';
import { generateRecurringEvents } from '../utils/recurringEventUtils';

export const useEventOperations = (editing: boolean, onSave?: () => void) => {
  const [events, setEvents] = useState<Event[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const { events: rawEvents } = await response.json();

      // Expand recurring events for display
      // <!-- 표시를 위해 반복 일정 펼치기 -->
      const expandedEvents: Event[] = [];
      for (const event of rawEvents) {
        if (event.repeat.type !== 'none') {
          // Generate all occurrences of recurring event
          // <!-- 반복 일정의 모든 발생 생성 -->
          const occurrences = generateRecurringEvents(event);
          expandedEvents.push(...occurrences);
        } else {
          expandedEvents.push(event);
        }
      }

      setEvents(expandedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      enqueueSnackbar('이벤트 로딩 실패', { variant: 'error' });
    }
  };

  const saveEvent = async (eventData: Event | EventForm) => {
    try {
      let response;

      // Save as single event regardless of repeat type
      // Recurring events will be expanded when displayed
      // <!-- 반복 유형과 관계없이 단일 이벤트로 저장 -->
      // <!-- 반복 일정은 표시할 때 펼쳐짐 -->
      if (editing) {
        const event = eventData as Event;
        // For recurring events, use original event ID and original start date
        // <!-- 반복 일정의 경우 원본 이벤트 ID와 원본 시작 날짜 사용 -->
        const updateId = event.repeat?.originalEventId || event.id;
        const updateDate = event.repeat?.originalDate || event.date;

        // Prepare data for update (use original start date for recurring events)
        // <!-- 수정 데이터 준비 (반복 일정은 원본 시작 날짜 사용) -->
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { id: _id, repeat: _repeat, ...eventWithoutIdAndRepeat } = event;
        // <!-- Virtual ID와 repeat 제거 (메타데이터 포함) -->

        const updateData = {
          ...eventWithoutIdAndRepeat,
          date: updateDate,
          repeat: {
            type: event.repeat.type,
            interval: event.repeat.interval,
            endDate: event.repeat.endDate,
            // Don't send internal fields to server
            // <!-- 내부 필드는 서버로 전송하지 않음 -->
          },
        };

        response = await fetch(`/api/events/${updateId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        });
      } else {
        response = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      await fetchEvents();
      onSave?.();
      enqueueSnackbar(editing ? '일정이 수정되었습니다.' : '일정이 추가되었습니다.', {
        variant: 'success',
      });
    } catch (error) {
      console.error('Error saving event:', error);
      enqueueSnackbar('일정 저장 실패', { variant: 'error' });
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      // Find the event to check if it's a recurring event
      // <!-- 반복 일정인지 확인하기 위해 이벤트 찾기 -->
      const eventToDelete = events.find((e) => e.id === id);
      const deleteId = eventToDelete?.repeat?.originalEventId || id;
      // Use original event ID if it's a recurring event occurrence
      // <!-- 반복 일정의 발생인 경우 원본 이벤트 ID 사용 -->

      const response = await fetch(`/api/events/${deleteId}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      await fetchEvents();
      enqueueSnackbar('일정이 삭제되었습니다.', { variant: 'info' });
    } catch (error) {
      console.error('Error deleting event:', error);
      enqueueSnackbar('일정 삭제 실패', { variant: 'error' });
    }
  };

  async function init() {
    await fetchEvents();
    enqueueSnackbar('일정 로딩 완료!', { variant: 'info' });
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { events, fetchEvents, saveEvent, deleteEvent };
};
