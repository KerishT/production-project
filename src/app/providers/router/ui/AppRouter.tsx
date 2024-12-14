import { Suspense } from "react"
import { useTranslation } from "react-i18next"
import { Route, Routes } from "react-router-dom"
import { RouteConfig } from "shared/config/routeConfig/routeConfig"

const AppRouter = () => {
  const { t } = useTranslation()
  return (
    <Suspense fallback={t("Загрузка...")}>
      <Routes>
        {Object.values(RouteConfig).map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<div className="page-wrapper">{element}</div>}
          />
        ))}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
