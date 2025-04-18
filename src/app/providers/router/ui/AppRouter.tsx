import { getUserAuthData } from 'entities/User';
import { memo, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RouteConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';

const AppRouter = () => {
    const isAuth = useSelector(getUserAuthData);

    const routes = Object.values(RouteConfig).filter((route) => {
        if (route.authOnly && !isAuth) {
            return false;
        }
        return true;
    });

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routes.map(({ path, element }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<div className="page-wrapper">{element}</div>}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouter);
