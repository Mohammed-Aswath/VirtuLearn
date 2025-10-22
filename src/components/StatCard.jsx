import { Card } from './ui/card';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, description, trend, colorClass = "text-primary", index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
    >
      <Card className="p-6 transition-all duration-300 hover:shadow-lg group cursor-pointer overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <motion.h3 
                className="text-3xl font-bold text-foreground"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.08 + 0.2 }}
              >
                {value}
              </motion.h3>
              {trend && (
                <motion.span 
                  className={`text-sm font-medium ${trend > 0 ? 'text-success' : 'text-destructive'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 + 0.3 }}
                >
                  {trend > 0 ? '+' : ''}{trend}%
                </motion.span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          {Icon && (
            <motion.div 
              className={`rounded-lg bg-gradient-primary p-3 ${colorClass} group-hover:scale-110 transition-transform`}
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
