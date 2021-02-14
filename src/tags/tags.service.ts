import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from './tag.entity'

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  async getAllTags() {
    return this.tagRepository.find({
      order: {
        id: 'DESC'
      }
    })
  }

  async createTag(tag: string) {
    const hasTag = await this.findTag(tag)
    if (!hasTag) {
      const newTag = new Tag()
      newTag.tag = tag

      await this.tagRepository.save(newTag)
    }
  }

  async findTag(tag: string) {
    const hasTag = await this.tagRepository.findOne({ where: { tag } })
    return hasTag
  }
}
