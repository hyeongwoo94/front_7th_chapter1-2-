import { Event, EventForm } from '../types';

/**
 * Determines if overlap allows bypass (continue)
 * 寃뱀묠??bypass(怨꾩냽 吏꾪뻾)瑜??덉슜?섎뒗吏 ?먮떒
 *
 * Bypass is only allowed when one event is recurring and the other is normal.
 * bypass?????쇱젙??諛섎났?닿퀬 ?ㅻⅨ ?쇱젙???쇰컲???뚮쭔 ?덉슜?⑸땲??
 *
 * @param newEvent - Event being added/edited
 * @param overlappingEvents - Events that overlap with newEvent
 * @returns true if bypass should be allowed (recurring + normal conflict)
 */
export function hasRecurringNormalConflict(
  newEvent: Event | EventForm,
  overlappingEvents: Event[]
): boolean {
  const newIsRecurring = newEvent.repeat.type !== 'none';

  return overlappingEvents.some((event) => {
    const overlapIsRecurring = event.repeat.type !== 'none';
    // XOR: One is recurring, other is not
    // XOR: ?섎굹??諛섎났, ?ㅻⅨ ?섎굹???쇰컲
    return newIsRecurring !== overlapIsRecurring;
  });
}
