import Spinner from '@/components/Feedback/Spinner/Spinner';
import AuthLayout from '@/components/Layouts/AuthLayout';
import MainLayout from '@/components/Layouts/MainLayout';
import Login from '@/features/auth/routes/Login';
import Home from '@/features/home/Home';
import useAuth from '@/state/hooks/useAuth';
import storage from '@/utils/storage';
import { Suspense, useMemo } from 'react';
import { Navigate, Outlet, RouteObject, useParams } from 'react-router-dom';

const commonAuthRoutes: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  { path: 'entry-points/*', element: <>Entry Points</> },
  { path: 'queues/*', element: <>Queues</> },
  { path: 'menus/*', element: <>Menus</> },
  { path: 'messages/*', element: <>Messages</> },
  { path: 'sections/*', element: <>Sections</> },
  { path: 'schedules/*', element: <>Schedules</> },
  { path: 'schedule-exceptions/*', element: <>Schedule Exceptions</> },
];

const superUserRoutes: RouteObject[] = [
  {
    path: 'unassigned-entities/*',
    element: <>Unassigned Entities</>,
  },
  { path: 'business-units/*', element: <>Business Units</> },
  { path: 'users/*', element: <>Users</> },
  { path: 'routes/*', element: <>Routes</> },
];

function BusinessUnit() {
  const { businessUnitId } = useParams();
  const { businessUnits } = useAuth();

  if (!businessUnits.length) {
    return (
      <AuthLayout title="Business Units Required">
        <p>
          Business Units need to be assigned to your user in order to login to
          Wave.
        </p>
        <p>Please contact an administrator</p>
      </AuthLayout>
    );
  }

  if (businessUnits.findIndex((bu) => bu.id === businessUnitId) === -1) {
    return <>Unauthorised</>;
  }

  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
}

function useUserRoutes(): RouteObject[] {
  const { user, businessUnits } = useAuth();

  const routes = useMemo(() => {
    if (!user) return [{ path: '/auth/login', element: <Login /> }];

    const redirects: RouteObject[] = [
      { path: '/', element: <Navigate replace to="/app" /> },
      {
        path: '/app',
        element: (
          <Navigate
            replace
            to={storage.businessUnit.getBusinessUnit() || businessUnits[0].id}
          />
        ),
      },
    ];

    const authRoutes = commonAuthRoutes;
    if (user.isSuperuser) authRoutes.push(...superUserRoutes);

    return [
      ...redirects,
      {
        path: '/app/:businessUnitId',
        element: <BusinessUnit />,
        children: authRoutes,
      },
    ];
  }, [user, businessUnits]);

  return routes;
}

export default useUserRoutes;
