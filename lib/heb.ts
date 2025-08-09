 export const translateLabelToHebrew = (label: string) => {
  const translations: Record<string, string> = {
    Main: 'ראשי',
    tableSettings: 'הגדרות טבלה',
    ServiceRecords: 'רישומי שירות',
    Assets: 'נכסים',
    Technician: 'טכנאים',
    profile: 'פרופיל',
    logout: 'התנתק',
  };

  return translations[label] || label;
};

export const translatePriorityToHebrew = (priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'): string => {
  switch (priority) {
    case 'LOW':
      return 'נמוכה';
    case 'MEDIUM':
      return 'בינונית';
    case 'HIGH':
      return 'גבוהה';
    case 'CRITICAL':
      return 'קריטית';
    default:
      return priority;
  }
};

export const translateStatusToHebrew = (status: 'NEW' | 'IN_PROGRESS' | 'DONE' | "PENDING"): string => {
  switch (status) {
    case 'NEW':
      return '(חדש)';
    case 'IN_PROGRESS':
      return '(בתהליך)';
    case 'PENDING':
      return '(בהמתנה)';
    case 'DONE':
      return '(סגור)';
    default:
      return status;
  }
};