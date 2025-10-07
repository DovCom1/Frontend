import React from "react"
import Icon from "../../../shared/atoms/icons/Icon";
import { createIconTextOptions } from "../../../shared/atoms/dropdown/options/IconTextOption";

export const getFriends = () => {
    return createIconTextOptions([
                { value: '1', icon: <Icon path="https://i.pravatar.cc/" size='100px' />, text: 'Name1'},
                { value: '2', icon: <Icon path="https://i.pravatar.cc/100" size='100px' />, text: 'Name2'},
                { value: '3', icon: <Icon path="https://i.pravatar.cc/101" size='100px' />, text: 'Name3'},
                { value: '4', icon: <Icon path="https://i.pravatar.cc/102" size='100px' />, text: 'Name4'},
                { value: '5', icon: <Icon path="https://i.pravatar.cc/103" size='100px' />, text: 'Name5'},
                { value: '6', icon: <Icon path="https://i.pravatar.cc/104" size='100px' />, text: 'Name6'},
                { value: '7', icon: <Icon path="https://i.pravatar.cc/105" size='100px' />, text: 'Name7'},
                { value: '8', icon: <Icon path="https://i.pravatar.cc/106" size='100px' />, text: 'Name8'},
                { value: '9', icon: <Icon path="https://i.pravatar.cc/107" size='100px' />, text: 'Name9'},
                { value: '10', icon: <Icon path="https://i.pravatar.cc/108" size='100px' />, text: 'Name10'},
                { value: '11', icon: <Icon path="https://i.pravatar.cc/109" size='100px' />, text: 'Name11'},
                { value: '12', icon: <Icon path="https://i.pravatar.cc/110" size='100px' />, text: 'Name12'},
                { value: '13', icon: <Icon path="https://i.pravatar.cc/111" size='100px' />, text: 'Name13'},
                { value: '14', icon: <Icon path="https://i.pravatar.cc/112" size='100px' />, text: 'Name14'},
                { value: '15', icon: <Icon path="https://i.pravatar.cc/113" size='100px' />, text: 'Name15'},
              ]);
}
