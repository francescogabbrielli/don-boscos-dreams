import { createContext } from "react"

export const metadata: {
  title: string,
  dateOptions: Intl.DateTimeFormatOptions
} = {
  title: "Don Bosco's Dreams",
  dateOptions: {day: "numeric", month: "long", year: "numeric"}
} 

export const SettingsContext = createContext({
  latin: localStorage.getItem("translateLatin") === "1",
  toggleLatin: () => {}
})