import {MaterialTopTabNavigationConfig} from '@react-navigation/material-top-tabs/src/types';
import {RouteProp, ParamListBase} from '@react-navigation/native';

export type RXTopTabNavigationConfig<ParamList extends ParamListBase = {}, RouteName extends keyof ParamList = string, ScreenOptions extends {} = {}> = MaterialTopTabNavigationConfig & {
    headerOptions?: ScreenOptions | ((props: {
                route: RouteProp<ParamList, RouteName>;
                navigation: any;
            }) => ScreenOptions);
};

export type RXInnerHeaderContainerProps ={

}