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
        bodyData.edits.forEach(edit => {
          let editName: string;
          try {
            editName = edit.field;
          } catch {
            throw new HttpException("Array must contains 'field'", 404);
          }
          try {
            edit['editName'];
          } catch {
            throw new HttpException("Field '${fieldName}'", 404);
          }
          let fieldName: string;
          for (fieldName in edit) {
            if (fieldName !== editName && fieldName != 'field') {
              delete edit[fieldName];
            }
          }
        });
      } catch (err) {
        console.log(err);
      }

      console.log(bodyData);
      return bodyData;
    }
  }
}
