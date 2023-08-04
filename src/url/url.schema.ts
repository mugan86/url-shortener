
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema()
export class Url {
    @Prop()
    id: number;

    @Prop()
    urlCode: string;

    @Prop()
    longUrl: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    keywords: string[]
}

export const UrlSchema = SchemaFactory.createForClass(Url); 