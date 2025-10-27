import { fetchHolidays } from '../../../apis/fetchHolidays';

describe('fetchHolidays >', () => {
  it('공휴일이 없는 월에 대해 빈객체를 반환한다', () => {
    const testDate = new Date('2025-04-01');
    const holidays = fetchHolidays(testDate);
    expect(Object.keys(holidays)).toHaveLength(0);
  });
});

