import { renderHook, act } from '@testing-library/react';
import { useEventForm } from '../../../hooks/useEventForm';

describe('useEventForm >', () => {
  it('일정 생성 또는 수정 시 반복 유형을 선택할 수 있다', () => {
    // Arrange: Initialize hook
    const { result } = renderHook(() => useEventForm());

    // Assert: Initial state should be 'none'
    expect(result.current.repeatType).toBe('none');

    // Act: Change repeat type to 'daily'
    act(() => {
      result.current.setRepeatType('daily');
    });

    // Assert: Repeat type should be 'daily'
    expect(result.current.repeatType).toBe('daily');

    // Act: Change repeat type to 'weekly'
    act(() => {
      result.current.setRepeatType('weekly');
    });

    // Assert: Repeat type should be 'weekly'
    expect(result.current.repeatType).toBe('weekly');

    // Act: Change repeat type to 'monthly'
    act(() => {
      result.current.setRepeatType('monthly');
    });

    // Assert: Repeat type should be 'monthly'
    expect(result.current.repeatType).toBe('monthly');

    // Act: Change repeat type to 'yearly'
    act(() => {
      result.current.setRepeatType('yearly');
    });

    // Assert: Repeat type should be 'yearly'
    expect(result.current.repeatType).toBe('yearly');
  });
});

