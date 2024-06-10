import { View } from 'react-native';

import featuredStyles from '../../features/styles';
import Chart from './chart';
import Cards from './cards';
import Review from './review';


const DashboardScreen = () => {

    return (
        <View style={featuredStyles.screen_container}>
            <Chart />
            <Cards />
            <Review />
        </View>
    );
};
export default DashboardScreen;