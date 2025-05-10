import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function CategoryBreadcrumbs() {
  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-2">
      <Link href="/" className="hover:text-primary transition-colors">
        Bracket
      </Link>
      <ChevronRight className="mx-2 h-4 w-4" />
      <Link href="/events" className="hover:text-primary transition-colors">
        Eventos
      </Link>
      <ChevronRight className="mx-2 h-4 w-4" />
      <span>Cali 2024 World Boccia Challenger</span>
    </nav>
  );
}
