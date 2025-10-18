import { Card } from './ui/card';

const StatCard = ({ title, value, icon: Icon, description, trend, colorClass = "text-primary" }) => {
  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-foreground">{value}</h3>
            {trend && (
              <span className={`text-sm font-medium ${trend > 0 ? 'text-success' : 'text-destructive'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {Icon && (
          <div className={`rounded-lg bg-gradient-primary p-3 ${colorClass}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
