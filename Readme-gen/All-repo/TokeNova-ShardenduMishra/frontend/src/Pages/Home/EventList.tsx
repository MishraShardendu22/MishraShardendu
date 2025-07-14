import EventCard from "@/components/Events/EventCard";
import { Event } from "@/components/Types/Event.types";
import { motion, AnimatePresence } from "framer-motion";

interface EventListProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
}

const EventList = ({ events, onEventSelect }: EventListProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <EventCard event={event} onEventSelect={onEventSelect} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default EventList;
