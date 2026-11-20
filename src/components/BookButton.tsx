import { DIKIDI_BOOKING_URL } from "@/data/serviceCatalog";

interface BookButtonProps {
  className?: string;
}

const BookButton = ({ className = "" }: BookButtonProps) => {
  return (
    <a
      href={DIKIDI_BOOKING_URL}
      className={`btn-book ${className}`}
    >
      Записаться на приём
    </a>
  );
};

export default BookButton;
