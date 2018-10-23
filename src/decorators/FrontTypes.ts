import { RPackage, IType } from '../class/FrontTypes'
import { addRp, addRpAttribute } from '../..'

/**
 * Declare a RakkitPackge to show into front-end
 * It always called after Attribute decorator
 * @param rakkitPackage The RakkitPackage object with informations (description, icon, ...)
 */
// tslint:disable-next-line:variable-name
export const Package = (rakkitPackage: RPackage): Function => {
  return (target: Function): void => {
    const className = target.name.toLowerCase()
    addRp({
      Id: className,
      Name: target.name,
      ...rakkitPackage
    })
  }
}

/**
 * Pupulate the attributes into an object,
 * it's a temp variable because it's called before Package decorator
 * It always called before Package decorator
 * @param type The front-end type, it describe how the datas will be displayed
 */
// tslint:disable-next-line:variable-name
export const Attribute = (type: IType): Function => {
  return (target: Object, key: string): void => {
    const className = target.constructor.name.toLowerCase()
    addRpAttribute(className, key, type)
  }
}
