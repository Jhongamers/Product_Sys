import {
    Routes,
    Route,
} from 'react-router-dom';

import ListProduct from '../ListProduct/ListProduct';
import Add from '../Pages/Add';
export default function MainRoutes(){
    return (
        <Routes>
            <Route path='/' element={<ListProduct />} />
            <Route path='/add' element={<Add />} />
        </Routes>
    )
}