import { Event } from '../../types';
import { generateRecurringEvents } from '../../utils/recurringEventUtils';

describe('반복일정 >', () => {
  const baseEvent: Event = {
    id: '1',
    title: '반복 테스트',
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
    description: '테스트 설명',
    location: '테스트 장소',
    category: '업무',
    repeat: {
      type: 'daily',
      interval: 1,
    },
    notificationTime: 10,
  };

  describe('매일 반복', () => {
    it('매일 반복 일정을 생성한다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-01',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-01-05',
        },
      };

      const result = generateRecurringEvents(event);

      expect(result).toHaveLength(5);
      expect(result[0].date).toBe('2025-01-01');
      expect(result[1].date).toBe('2025-01-02');
      expect(result[2].date).toBe('2025-01-03');
      expect(result[3].date).toBe('2025-01-04');
      expect(result[4].date).toBe('2025-01-05');
    });

    it('매일 반복 일정을 2일 간격으로 생성한다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-01',
        repeat: {
          type: 'daily',
          interval: 2,
          endDate: '2025-01-09',
        },
      };

      const result = generateRecurringEvents(event);

      expect(result).toHaveLength(5);
      expect(result[0].date).toBe('2025-01-01');
      expect(result[1].date).toBe('2025-01-03');
      expect(result[2].date).toBe('2025-01-05');
      expect(result[3].date).toBe('2025-01-07');
      expect(result[4].date).toBe('2025-01-09');
    });

    it('종료일이 없으면 최대 365일까지 생성한다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-01',
        repeat: {
          type: 'daily',
          interval: 1,
        },
      };

      const result = generateRecurringEvents(event, 365);

      expect(result).toHaveLength(365);
    });
  });

  describe('매주 반복', () => {
    it('매주 반복 일정을 생성한다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-01',
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: '2025-01-29',
        },
      };

      const result = generateRecurringEvents(event);

      expect(result).toHaveLength(5);
      expect(result[0].date).toBe('2025-01-01');
      expect(result[1].date).toBe('2025-01-08');
      expect(result[2].date).toBe('2025-01-15');
      expect(result[3].date).toBe('2025-01-22');
      expect(result[4].date).toBe('2025-01-29');
    });

    it('매주 반복 일정을 2주 간격으로 생성한다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-01',
        repeat: {
          type: 'weekly',
          interval: 2,
          endDate: '2025-02-26',
        },
      };

      const result = generateRecurringEvents(event);

      expect(result).toHaveLength(5);
      expect(result[0].date).toBe('2025-01-01');
      expect(result[1].date).toBe('2025-01-15');
      expect(result[2].date).toBe('2025-01-29');
      expect(result[3].date).toBe('2025-02-12');
      expect(result[4].date).toBe('2025-02-26');
    });
  });

  describe('매월 반복', () => {
    it('매월 반복 일정을 생성한다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-15',
        repeat: {
          type: 'monthly',
          interval: 1,
          endDate: '2025-05-15',
        },
      };

      const result = generateRecurringEvents(event);

      expect(result).toHaveLength(5);
      expect(result[0].date).toBe('2025-01-15');
      expect(result[1].date).toBe('2025-02-15');
      expect(result[2].date).toBe('2025-03-15');
      expect(result[3].date).toBe('2025-04-15');
      expect(result[4].date).toBe('2025-05-15');
    });

    it('매월 반복 일정을 2개월 간격으로 생성한다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-15',
        repeat: {
          type: 'monthly',
          interval: 2,
          endDate: '2025-09-15',
        },
      };

      const result = generateRecurringEvents(event);

      expect(result).toHaveLength(5);
      expect(result[0].date).toBe('2025-01-15');
      expect(result[1].date).toBe('2025-03-15');
      expect(result[2].date).toBe('2025-05-15');
      expect(result[3].date).toBe('2025-07-15');
      expect(result[4].date).toBe('2025-09-15');
    });

    it('매월 31일 반복 일정이 31일이 없는 달에는 건너뛴다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-31',
        repeat: {
          type: 'monthly',
          interval: 1,
          endDate: '2025-08-31',
        },
      };

      const result = generateRecurringEvents(event);

      // 31일이 있는 달만: 1월, 3월, 5월, 7월, 8월
      // 2월(28일), 4월(30일), 6월(30일)은 건너뜀
      expect(result).toHaveLength(5);
      expect(result[0].date).toBe('2025-01-31');
      expect(result[1].date).toBe('2025-03-31');
      expect(result[2].date).toBe('2025-05-31');
      expect(result[3].date).toBe('2025-07-31');
      expect(result[4].date).toBe('2025-08-31');
    });

    it('매월 31일 반복 일정이 윤년의 2월을 건너뛴다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2024-01-31',
        repeat: {
          type: 'monthly',
          interval: 1,
          endDate: '2024-03-31',
        },
      };

      const result = generateRecurringEvents(event);

      // 31일이 있는 달만: 1월, 3월 (2월은 윤년이어도 29일까지라서 건너뜀)
      expect(result).toHaveLength(2);
      expect(result[0].date).toBe('2024-01-31');
      expect(result[1].date).toBe('2024-03-31');
    });
  });

  describe('매년 반복', () => {
    it('매년 반복 일정을 생성한다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-15',
        repeat: {
          type: 'yearly',
          interval: 1,
          endDate: '2029-01-15',
        },
      };

      const result = generateRecurringEvents(event);

      expect(result).toHaveLength(5);
      expect(result[0].date).toBe('2025-01-15');
      expect(result[1].date).toBe('2026-01-15');
      expect(result[2].date).toBe('2027-01-15');
      expect(result[3].date).toBe('2028-01-15');
      expect(result[4].date).toBe('2029-01-15');
    });

    it('매년 반복 일정을 2년 간격으로 생성한다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-15',
        repeat: {
          type: 'yearly',
          interval: 2,
          endDate: '2033-01-15',
        },
      };

      const result = generateRecurringEvents(event);

      expect(result).toHaveLength(5);
      expect(result[0].date).toBe('2025-01-15');
      expect(result[1].date).toBe('2027-01-15');
      expect(result[2].date).toBe('2029-01-15');
      expect(result[3].date).toBe('2031-01-15');
      expect(result[4].date).toBe('2033-01-15');
    });

    it('매년 2월 29일 반복 일정이 윤년에만 생성된다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2024-02-29', // 윤년
        repeat: {
          type: 'yearly',
          interval: 1,
          endDate: '2032-02-29',
        },
      };

      const result = generateRecurringEvents(event);

      // 윤년에만 2월 29일이 존재: 2024, 2028, 2032
      // 평년 (2025, 2026, 2027, 2029, 2030, 2031)은 건너뜀
      expect(result).toHaveLength(3);
      expect(result[0].date).toBe('2024-02-29'); // 윤년
      expect(result[1].date).toBe('2028-02-29'); // 윤년
      expect(result[2].date).toBe('2032-02-29'); // 윤년
    });
  });

  describe('반복 없음', () => {
    it('반복 유형이 none이면 원본 일정만 반환한다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-01',
        repeat: {
          type: 'none',
          interval: 0,
        },
      };

      const result = generateRecurringEvents(event);

      expect(result).toHaveLength(1);
      expect(result[0].date).toBe('2025-01-01');
    });
  });

  describe('반복 일정 속성', () => {
    it('생성된 모든 반복 일정이 원본 일정의 속성을 유지한다', () => {
      const event: Event = {
        ...baseEvent,
        title: '팀 회의',
        date: '2025-01-01',
        startTime: '14:00',
        endTime: '15:30',
        description: '주간 팀 회의',
        location: '회의실 A',
        category: '업무',
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: '2025-01-15',
        },
        notificationTime: 30,
      };

      const result = generateRecurringEvents(event);

      result.forEach((recurringEvent) => {
        expect(recurringEvent.title).toBe('팀 회의');
        expect(recurringEvent.startTime).toBe('14:00');
        expect(recurringEvent.endTime).toBe('15:30');
        expect(recurringEvent.description).toBe('주간 팀 회의');
        expect(recurringEvent.location).toBe('회의실 A');
        expect(recurringEvent.category).toBe('업무');
        expect(recurringEvent.notificationTime).toBe(30);
      });
    });

    it('생성된 모든 반복 일정이 고유한 id를 가진다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-01',
        repeat: {
          type: 'daily',
          interval: 1,
          endDate: '2025-01-05',
        },
      };

      const result = generateRecurringEvents(event);

      const ids = result.map((e) => e.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(result.length);
    });

    it('생성된 모든 반복 일정이 동일한 repeat.id를 가진다', () => {
      const event: Event = {
        ...baseEvent,
        date: '2025-01-01',
        repeat: {
          type: 'weekly',
          interval: 1,
          endDate: '2025-01-15',
        },
      };

      const result = generateRecurringEvents(event);

      const repeatIds = result.map((e) => e.repeat.id);
      const uniqueRepeatIds = new Set(repeatIds);

      expect(uniqueRepeatIds.size).toBe(1);
      expect(repeatIds[0]).toBeDefined();
    });

    it('생성된 모든 반복 일정이 originalEventId와 originalDate를 가진다', () => {
      const event: Event = {
        ...baseEvent,
        id: 'original-123',
        date: '2025-01-31',
        repeat: {
          type: 'monthly',
          interval: 1,
          endDate: '2025-05-31',
        },
      };

      const result = generateRecurringEvents(event);

      result.forEach((recurringEvent) => {
        expect(recurringEvent.repeat.originalEventId).toBe('original-123');
        expect(recurringEvent.repeat.originalDate).toBe('2025-01-31');
      });
    });
  });
});
