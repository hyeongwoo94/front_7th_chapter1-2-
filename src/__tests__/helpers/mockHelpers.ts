import { http, HttpResponse } from 'msw';

import { server } from '../../setupTests';
import { Event } from '../../types';

/**
 * Setup complete mock handlers for recurring event tests
 * <!-- 반복 일정 테스트를 위한 완전한 mock 핸들러 설정 -->
 */
export function setupRecurringEventMocks(initialEvents: Event[]) {
  const mockEvents: Event[] = [...initialEvents];

  server.use(
    // GET: Return mock events
    http.get('/api/events', () => {
      return HttpResponse.json({ events: mockEvents });
    }),

    // POST: Create new event (for single instance conversion)
    http.post('/api/events', async ({ request }) => {
      const newEvent = (await request.json()) as Event;
      newEvent.id = `new-${mockEvents.length + 1}`;
      mockEvents.push(newEvent);
      return HttpResponse.json(newEvent, { status: 201 });
    }),

    // PUT: Update existing event (for recurring event update)
    http.put('/api/events/:id', async ({ params, request }) => {
      const { id } = params;
      const updatedEventData = (await request.json()) as Partial<Event>;

      const index = mockEvents.findIndex((event) => event.id === id);
      if (index !== -1) {
        // Update existing event in mock array
        mockEvents[index] = {
          ...mockEvents[index],
          ...updatedEventData,
          id: id as string,
        };
        return HttpResponse.json(mockEvents[index]);
      }

      return new HttpResponse(null, { status: 404 });
    }),

    // DELETE: Delete event
    http.delete('/api/events/:id', ({ params }) => {
      const { id } = params;
      const index = mockEvents.findIndex((event) => event.id === id);
      if (index !== -1) {
        mockEvents.splice(index, 1);
      }
      return new HttpResponse(null, { status: 204 });
    })
  );

  return mockEvents; // Return reference for test assertions
}
