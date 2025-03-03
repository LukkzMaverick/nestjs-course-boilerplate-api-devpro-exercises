import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/guards/jwt-auth-guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { RoleService } from './role.service';

@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  @ApiOperation({
    operationId: 'role_create',
    description: 'Endpoint to create a new role',
  })
  @ApiOkResponse({
    description: 'Success role created',
  })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'role_findAll',
    description: 'Endpoint to find all',
  })
  findAll(): Promise<RoleDto[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'role_findOne',
    description: 'Endpoint to create a new role',
  })
  @ApiOkResponse({
    description: 'Success role created',
  })
  @ApiNotFoundResponse({
    description: 'Was not able to find role',
  })
  async findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @ApiOperation({
    operationId: 'role_update',
    description: 'Endpoint to update role',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @ApiOperation({
    operationId: 'role_delete',
    description: 'Endpoint to delete all',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
