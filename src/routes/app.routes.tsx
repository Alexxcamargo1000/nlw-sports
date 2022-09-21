import { Route, Routes } from "react-router-dom";
import { Game } from "../pages/Game";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/game/:id" element={<Game />}/>
    </Routes>
  )
}