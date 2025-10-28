import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Modal from '../../components/Modal';

describe('Modal Component', () => {
  it('should render modal with text "이것은 모달입니다."', () => {
    // Arrange
    const handleClose = vi.fn();

    // Act
    render(<Modal isOpen={true} onClose={handleClose} />);

    // Assert
    expect(screen.getByText('이것은 모달입니다.')).toBeInTheDocument();
  });

  it('should render a confirm button', () => {
    // Arrange
    const handleClose = vi.fn();

    // Act
    render(<Modal isOpen={true} onClose={handleClose} />);

    // Assert
    expect(screen.getByRole('button', { name: /확인/i })).toBeInTheDocument();
  });

  it('should call onClose when confirm button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    const handleClose = vi.fn();

    // Act
    render(<Modal isOpen={true} onClose={handleClose} />);
    const confirmButton = screen.getByRole('button', { name: /확인/i });
    await user.click(confirmButton);

    // Assert
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should not render modal when isOpen is false', () => {
    // Arrange
    const handleClose = vi.fn();

    // Act
    render(<Modal isOpen={false} onClose={handleClose} />);

    // Assert
    expect(screen.queryByText('이것은 모달입니다.')).not.toBeInTheDocument();
  });
});

