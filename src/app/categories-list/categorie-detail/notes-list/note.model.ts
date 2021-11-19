export class Note{
  constructor( public title: string, public content: string, public category_id: number,public updated_at: Date | null, public id?: number| null) {
  }
}
