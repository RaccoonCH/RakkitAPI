import { FrontType, TypeParams, IPackageParams } from "@types";
import { Main } from "@main";

/**
 * Declare a RakkitPackge to show into front-end
 * It always called after Attribute decorator
 * @param rakkitPackage The RakkitPackage object with informations (description, icon, ...)
 */
export const Package = (rakkitPackage?: IPackageParams): Function => {
  return (target: Function): void => {
    let name = target.name;
    if (rakkitPackage && rakkitPackage.name) {
      name = rakkitPackage.name;
    }
    Main.Instance.AddRp({
      name,
      className: target.name,
      ...(rakkitPackage || {}),
      attributes: []
    });
  };
};

/**
 * Pupulate the attributes into an object,
 * it's a temp variable because it's called before Package decorator
 * It always called before Package decorator
 * @param type The front-end type, it describe how the datas will be displayed
 */
export const Attribute = (
  type: FrontType,
  params: TypeParams = {
    isEditable: true,
    isInHeader: true,
    isSearchable: false,
    placeOrder: 0
  }
): Function => {
  return (target: Object, key: string): void => {
    Main.Instance.AddRpAttribute(target.constructor.name, key, type, params);
  };
};
