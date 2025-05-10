import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Trophy } from "lucide-react";
import { CategoryEvent, Court } from "@/types/categories-events.type";

interface Props {
  category: CategoryEvent;
}

export function CategoryInfoCard({ category }: Props) {
  return (
    <Card className="mb-8">
      <CardHeader className="pb-0">
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge variant="outline" className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> {category.date}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {category.location}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> {category.entrants} participantes
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5" /> {category.format}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {category.courts.map((court: Court, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {idx + 1}
              </div>
              <div>
                <div className="text-sm font-medium">{court.name}</div>
                <div className="text-xs text-muted-foreground">
                  {court.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
