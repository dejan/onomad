// return a string in Serbian like "pre 5 minuta" for a given date
function timeago(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  // Less than 1 minute
  if (seconds < 60) {
    return "malopre";
  }

  // Minutes
  if (minutes < 60) {
    if (minutes === 1) {
      return "pre minut";
    }
    if (minutes === 30) {
      return "pre pola sata";
    }
    return `pre ${minutes} minuta`;
  }

  // Hours
  if (hours < 20) {
    if (hours === 1) {
      return "pre sat vremena";
    }
    if (hours >= 2 && hours <= 4) {
      return `pre ${hours} sata`;
    }
    return `pre ${hours} sati`;
  }

  // Yesterday (20-47 hours)
  if (hours < 48) {
    return "juče";
  }

  // Days (2-6 days)
  if (days < 7) {
    return `pre ${days} dana`;
  }

  // Weeks (7-27 days)
  if (days < 28) {
    const weeks = Math.round(days / 7);
    if (weeks === 1) {
      return "pre nedelju dana";
    }
    if (weeks >= 2 && weeks <= 4) {
      if (weeks === 2) return "pre 2 nedelje";
      if (weeks === 3) return "pre 3 nedelje";
      return `pre ${weeks} nedelje`;
    }
    return `pre ${weeks} nedelja`;
  }

  // Months (28-299 days)
  if (days < 300) {
    const months = Math.round(days / 30);
    if (months === 1) {
      return "pre mesec dana";
    }
    if (months >= 2 && months <= 4) {
      return `pre ${months} meseca`;
    }
    return `pre ${months} meseci`;
  }

  // Years
  const years = Math.round(days / 365);
  if (years === 1) {
    return "pre godinu dana";
  }
  if (years >= 2 && years <= 4) {
    return `pre ${years} godine`;
  }
  return `pre ${years} godina`;
}

export { timeago };
