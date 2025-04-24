import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../redux/actions/restaurantActions";

const useRestaurants = () => {
    const dispatch = useDispatch();
    const restaurantList = useSelector((state) => state.restaurantList);
    const { loading, restaurants, error } = restaurantList;

    useEffect(() => {
      dispatch(fetchRestaurants());
    }, [dispatch]);

    return { loading, restaurants, error };
};

export default useRestaurants;
