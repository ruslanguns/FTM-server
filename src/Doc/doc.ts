import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function implementDoc(path: string, app) {
  const options = new DocumentBuilder()
    .setTitle('FamilyTasks DOC')
    .setDescription('The familyTasks API documentation')
    .setVersion('0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(path, app, document);
}
