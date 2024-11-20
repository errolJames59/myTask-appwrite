import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useTheme } from "../lib/theme-provider"
import useSound from "use-sound";
import switchThemeSfx from "../sounds/switchTheme.mp3"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [play] = useSound(switchThemeSfx, { volume: 0.5 });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => { setTheme("light"); play(); }}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {setTheme("dark"); play(); }}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {setTheme("system"); play();}}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
