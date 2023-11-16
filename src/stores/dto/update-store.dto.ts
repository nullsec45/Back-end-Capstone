import { OmitType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends OmitType(CreateStoreDto, ['userId']) {}
