import { SetMetadata } from '@nestjs/common';

//eslint-disable-next-line
export const Public = () => SetMetadata( 'isPublic', true );
