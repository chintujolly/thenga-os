"use client";

import React, { useState } from "react";
import { useThengaStore } from "@/store/useThengaStore";
import { sound } from "@/utils/sound";

type Operator = "+" | "-" | "×" | "÷";

const DIV_BY_ZERO_MESSAGE = "Enth thenga aan ith?";

interface CalcState {
  display: string;
  lastEquation: string | null;
  firstOperand: number | null;
  operator: Operator | null;
  waitingForSecond: boolean;
  isError: boolean;
}

const INITIAL_STATE: CalcState = {
  display: "0",
  lastEquation: null,
  firstOperand: null,
  operator: null,
  waitingForSecond: false,
  isError: false,
};

type Action =
  | { type: "digit"; value: string }
  | { type: "decimal" }
  | { type: "operator"; value: Operator }
  | { type: "equals" }
  | { type: "clear" };

const formatNumber = (value: number): string => {
  if (!Number.isFinite(value)) return "Error";
  const rounded = parseFloat(value.toPrecision(12));
  return String(rounded);
};

const compute = (a: number, b: number, op: Operator): number | null => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      if (b === 0) return null;
      return a / b;
  }
};

export default function CoconutCalculator() {
  const [state, setState] = useState<CalcState>(INITIAL_STATE);
  const [coconutMode, setCoconutMode] = useState(true);
  const unlockAchievement = useThengaStore((s) => s.unlockAchievement);
  const spawnCoconutFall = useThengaStore((s) => s.spawnCoconutFall);
  const triggerScreenShake = useThengaStore((s) => s.triggerScreenShake);

  const dispatch = (action: Action) => {
    sound.playClick();
    setState((prev) => {
      switch (action.type) {
        case "clear":
          return { ...INITIAL_STATE };

        case "digit": {
          const s = prev.isError ? INITIAL_STATE : prev;
          if (s.waitingForSecond) {
            return { ...s, display: action.value, waitingForSecond: false };
          }
          return {
            ...s,
            display: s.display === "0" ? action.value : s.display + action.value,
          };
        }

        case "decimal": {
          const s = prev.isError ? INITIAL_STATE : prev;
          if (s.waitingForSecond) {
            return { ...s, display: "0.", waitingForSecond: false };
          }
          if (s.display.includes(".")) return s;
          return { ...s, display: s.display + "." };
        }

        case "operator": {
          const s = prev.isError ? INITIAL_STATE : prev;
          const inputValue = parseFloat(s.display);

          if (s.firstOperand !== null && s.operator && !s.waitingForSecond) {
            const result = compute(s.firstOperand, inputValue, s.operator);
            if (result === null) {
              sound.playError();
              triggerScreenShake();
              unlockAchievement("questionable-mathematics");
              spawnCoconutFall(1);
              return {
                ...INITIAL_STATE,
                isError: true,
                display: DIV_BY_ZERO_MESSAGE,
                lastEquation: `${formatNumber(s.firstOperand)} ${s.operator} ${formatNumber(inputValue)} =`,
              };
            }
            return {
              ...s,
              firstOperand: result,
              display: formatNumber(result),
              operator: action.value,
              waitingForSecond: true,
              lastEquation: `${formatNumber(result)} ${action.value}`,
            };
          }

          return {
            ...s,
            firstOperand: inputValue,
            operator: action.value,
            waitingForSecond: true,
            lastEquation: `${formatNumber(inputValue)} ${action.value}`,
          };
        }

        case "equals": {
          if (prev.operator === null || prev.firstOperand === null) return prev;

          const secondOperand = parseFloat(prev.display);
          const result = compute(prev.firstOperand, secondOperand, prev.operator);

          if (result === null) {
            sound.playError();
            triggerScreenShake();
            unlockAchievement("questionable-mathematics");
            spawnCoconutFall(1);
            return {
              ...INITIAL_STATE,
              isError: true,
              display: DIV_BY_ZERO_MESSAGE,
              lastEquation: `${formatNumber(prev.firstOperand)} ${prev.operator} ${formatNumber(secondOperand)} =`,
            };
          }

          const formatted = formatNumber(result);
          const suffix = coconutMode ? " 🥥" : "";

          return {
            ...INITIAL_STATE,
            display: formatted,
            waitingForSecond: true,
            lastEquation: `${formatNumber(prev.firstOperand)} ${prev.operator} ${formatNumber(
              secondOperand
            )} = ${formatted}${suffix}`,
          };
        }

        default:
          return prev;
      }
    });
  };

  const { display, lastEquation, isError } = state;

  return (
    <div className="flex flex-col h-full bg-[#e8d7ae] text-[#191008] select-none font-mono text-xs p-3">
      {/* Physical Pocket Calculator Case */}
      <div className="border-3 border-[#191008] bg-[#fdf7e7] p-3 shadow-[4px_4px_0_#191008] flex flex-col gap-2.5">
        {/* Brand & Solar Cell Strip */}
        <div className="flex items-center justify-between border-b-2 border-[#191008] pb-1.5">
          <span className="font-bold text-[10px] tracking-wider uppercase text-[#543015]">
            KERA-CALC 2000
          </span>
          {/* Solar Panel Cells */}
          <div className="flex gap-0.5 border border-[#191008] bg-[#3a2211] p-0.5">
            <div className="w-2 h-2.5 bg-[#5e381b] border-r border-[#191008]" />
            <div className="w-2 h-2.5 bg-[#5e381b] border-r border-[#191008]" />
            <div className="w-2 h-2.5 bg-[#5e381b]" />
          </div>
        </div>

        {/* Recessed LCD Screen */}
        <div className="border-2 border-[#191008] bg-[#142618] p-2.5 text-right shadow-[inset_2px_2px_0_rgba(0,0,0,0.5)]">
          <div className="h-3 text-[9px] text-[#4ed2ea] truncate">
            {lastEquation || " "}
          </div>
          <div
            className={`font-mono font-bold truncate leading-tight mt-1 ${
              isError
                ? "text-[#c93b2b] text-[13px] thenga-shake"
                : "text-[#3de865] text-xl"
            }`}
          >
            {display} {coconutMode && !isError && display !== "0" && "🥥"}
          </div>
        </div>

        {/* Mode Toggle Button */}
        <div className="flex justify-between items-center text-[10px]">
          <span className="font-bold text-[#6b4728]">COCONUT MODE:</span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setCoconutMode(!coconutMode);
            }}
            className={`thenga-pixel-btn px-2 py-0.5 font-bold ${
              coconutMode ? "bg-[#2b9e38] text-white" : "bg-white text-[#191008]"
            }`}
          >
            {coconutMode ? "ON 🥥" : "OFF"}
          </button>
        </div>

        {/* Chunky Retro Keypad */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {/* Clear */}
          <button
            type="button"
            onClick={() => dispatch({ type: "clear" })}
            className="thenga-pixel-btn col-span-4 py-1.5 font-bold text-xs bg-[#c93b2b] text-white hover:bg-[#de4433]"
          >
            CLEAR (C)
          </button>

          {/* Row 1 */}
          <button type="button" onClick={() => dispatch({ type: "digit", value: "7" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-white hover:bg-[#fffdf6]">7</button>
          <button type="button" onClick={() => dispatch({ type: "digit", value: "8" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-white hover:bg-[#fffdf6]">8</button>
          <button type="button" onClick={() => dispatch({ type: "digit", value: "9" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-white hover:bg-[#fffdf6]">9</button>
          <button type="button" onClick={() => dispatch({ type: "operator", value: "÷" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-[#f5a81e] hover:bg-[#ffba3b]">÷</button>

          {/* Row 2 */}
          <button type="button" onClick={() => dispatch({ type: "digit", value: "4" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-white hover:bg-[#fffdf6]">4</button>
          <button type="button" onClick={() => dispatch({ type: "digit", value: "5" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-white hover:bg-[#fffdf6]">5</button>
          <button type="button" onClick={() => dispatch({ type: "digit", value: "6" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-white hover:bg-[#fffdf6]">6</button>
          <button type="button" onClick={() => dispatch({ type: "operator", value: "×" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-[#f5a81e] hover:bg-[#ffba3b]">×</button>

          {/* Row 3 */}
          <button type="button" onClick={() => dispatch({ type: "digit", value: "1" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-white hover:bg-[#fffdf6]">1</button>
          <button type="button" onClick={() => dispatch({ type: "digit", value: "2" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-white hover:bg-[#fffdf6]">2</button>
          <button type="button" onClick={() => dispatch({ type: "digit", value: "3" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-white hover:bg-[#fffdf6]">3</button>
          <button type="button" onClick={() => dispatch({ type: "operator", value: "-" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-[#f5a81e] hover:bg-[#ffba3b]">-</button>

          {/* Row 4 */}
          <button type="button" onClick={() => dispatch({ type: "digit", value: "0" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-white hover:bg-[#fffdf6]">0</button>
          <button type="button" onClick={() => dispatch({ type: "decimal" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-white hover:bg-[#fffdf6]">.</button>
          <button type="button" onClick={() => dispatch({ type: "equals" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-[#2b9e38] text-white hover:bg-[#34b542]">=</button>
          <button type="button" onClick={() => dispatch({ type: "operator", value: "+" })} className="thenga-pixel-btn py-2 font-bold text-sm bg-[#f5a81e] hover:bg-[#ffba3b]">+</button>
        </div>
      </div>

      {/* Pointless Coconuts to Kola Unit Converter Sub-panel */}
      <div className="mt-2 p-2 border-2 border-[#191008] bg-[#fdf7e7] shadow-[2px_2px_0_#191008]">
        <div className="text-[9px] font-bold uppercase text-[#6b4728] tracking-wider mb-1">
          KOLA CONVERTER (ESTIMATE)
        </div>
        <div className="text-[11px] font-bold text-[#2b9e38]">
          1 KOLA = 7 COCONUTS
        </div>
        <div className="text-[9px] text-[#543015] italic">
          Division by zero yields pure coconut confusion.
        </div>
      </div>
    </div>
  );
}
