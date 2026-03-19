interface BookButtonProps {
  className?: string;
}

const BookButton = ({ className = "" }: BookButtonProps) => {
  return (
    <a
      href="https://t.me/salonnovobeauty"
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-book ${className}`}
    >
      Записаться на приём
    </a>
  );
};

export default BookButton;
