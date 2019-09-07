import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
} from '@nestjs/common';

@Injectable()
export class EditProfilePipe implements PipeTransform {
  transform(bodyData: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      try {
        const edit = bodyData.edits[0];
        let editName: string;
        editName = edit.field;
        if (!editName) {
          throw new HttpException("Array must contains 'field'", 404);
        }

        const checkField = edit[editName];
        if (!checkField) {
          throw new HttpException(`Field ${editName} required`, 404);
        }
        let fieldName: string;
        for (fieldName in edit) {
          if (fieldName !== editName && fieldName != 'field') {
            delete edit[fieldName];
          }
        }
      } catch (err) {
        console.log(err);
      }
      return bodyData;
    }
  }
}
