import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ServiceItem } from "@/data/serviceCatalog";

interface ServiceItemButtonProps {
  item: ServiceItem;
  className?: string;
  delay?: number;
}

const ServiceItemButton = ({ item, className = "", delay = 0 }: ServiceItemButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          type="button"
          title={`Подробнее: ${item.name}`}
          className={`group flex w-full cursor-pointer items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${className}`}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.25 }}
          whileHover={{ backgroundColor: "hsl(var(--accent) / 0.35)" }}
          whileTap={{ scale: 0.995 }}
        >
          <span className="text-foreground/85 transition-colors group-hover:text-foreground">
            {item.name}
          </span>
          <span className="flex shrink-0 items-center gap-2">
            <span className="font-semibold text-primary whitespace-nowrap">{item.price}</span>
            <ChevronRight
              aria-hidden="true"
              className="h-4 w-4 text-primary/50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </span>
        </motion.button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-h-[85vh] overflow-y-auto rounded-2xl sm:max-w-md">
        <DialogHeader className="pr-6 text-left">
          <DialogTitle className="font-heading text-2xl leading-snug">{item.name}</DialogTitle>
          <DialogDescription className="pt-2 text-sm leading-relaxed">
            {item.description}
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-xl bg-secondary/50 px-4 py-3 text-sm">
          {item.duration && <p className="mb-2 text-muted-foreground">Длительность: {item.duration}</p>}
          <span className="text-muted-foreground">Стоимость: </span>
          <span className="font-semibold text-primary">{item.price}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceItemButton;
