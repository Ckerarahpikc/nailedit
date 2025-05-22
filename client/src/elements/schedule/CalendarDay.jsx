import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

function CalendarDay() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = searchParams.get("dateId");

  return <div>helo</div>;
}

export default CalendarDay;
