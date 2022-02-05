interface IEducation {
  startsDate: Date;
  endsDate?: Date;
  field_of_study: string;
  degree_name: string;
  school: string;
  logo_url?: string;
}

export { IEducation };
