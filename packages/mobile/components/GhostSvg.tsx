import React from "react";
import Svg, { Path, Line, Circle, Defs, LinearGradient, Stop } from "react-native-svg";

interface GhostSvgProps {
  width?: number;
  height?: number;
}

export default function GhostSvg({ width = 100, height = 160 }: GhostSvgProps) {
  return (
    <Svg viewBox="150 110 100 160" width={width} height={height} style={{ alignSelf: "center" }}>
      {/* Ghost body */}
      <Path
        d="M199.5,120 C178.237,120 161,135.237 161,156.5 L161,176.5 L161,260 C161,261.657 162.343,263 164,263 L166,263 C167.657,263 169,261.657 169,260 L169,246.5 C169,244.015 171.015,242 173.5,242 C175.985,242 178,244.015 178,246.5 L178,249 C178,249.552 178.448,250 179,250 L183,250 C184.657,250 186,248.657 186,247 L186,226 C186,223.239 188.239,221 191,221 C193.761,221 196,223.239 196,226 L196,235 C196,236.657 197.343,238 199,238 L200,238 C201.657,238 203,236.657 203,235 L203,225 C203,222.791 205.791,220 208,220 C210.209,220 211,222.791 211,225 L211,243 C211,244.657 212.343,246 214,246 L216,246 C217.657,246 219,244.657 219,243 L219,226.5 C219,223.462 221.462,221 224.5,221 C227.538,221 230,223.462 230,226.5 L230,230 C230,231.657 231.343,233 233,233 L235,233 C236.657,233 238,231.657 238,230 L238,211.5 L238,156.5 C238,135.237 220.763,120 199.5,120 Z"
        fill="#ffffff"
        stroke="#434B60"
        strokeWidth="3"
      />

      {/* Left vertical lines */}
      <Line
        x1="174.5"
        y1="185.5"
        x2="174.5"
        y2="201.5"
        stroke="#444B54"
        strokeWidth="3"
        strokeOpacity="0.15"
        strokeLinecap="round"
      />
      <Line
        x1="168.5"
        y1="185.5"
        x2="164.5"
        y2="220.5"
        stroke="#444B54"
        strokeWidth="3"
        strokeOpacity="0.15"
        strokeLinecap="round"
        transform="rotate(-5.828 166.5 203)"
      />

      {/* Left eye outer */}
      <Circle cx="183" cy="141" r="7" fill="#444B54" />
      {/* Left eye inner */}
      <Circle cx="183" cy="145" r="3" fill="#ffffff" />

      {/* Right eye outer */}
      <Circle cx="217" cy="141" r="7" fill="#444B54" />
      {/* Right eye inner */}
      <Circle cx="217" cy="145" r="3" fill="#ffffff" />

      {/* Left cheek */}
      <Circle cx="182.5" cy="162.5" r="4.5" fill="#dcdcdc" fillOpacity="0.6" />
      {/* Right cheek */}
      <Circle cx="216.5" cy="162.5" r="4.5" fill="#dcdcdc" fillOpacity="0.6" />

      {/* Mouth outline */}
      <Path
        d="M193,160 L207,160 C207,161.857 205.687,166.505 204.95,166.505 C203.637,167.818 201.857,168.556 200,168.556 C198.143,168.556 196.363,167.818 195.05,166.505 C194.313,166.505 193,161.857 193,160 Z"
        fill="#444B54"
      />

      {/* Tongue */}
      <Path
        d="M203.863,167.393 C202.726,168.146 201.384,168.556 200,168.556 C198.277,168.556 196.619,167.92 195.341,166.78 C196.016,165.148 197.624,164 199.5,164 C201.603,164 203.37,165.443 203.863,167.393 Z"
        fill="url(#tongue-gradient)"
      />

      {/* Gradient for tongue */}
      <Defs>
        <LinearGradient id="tongue-gradient" x1="195" y1="166.5" x2="204" y2="167.5">
          <Stop offset="0" stopColor="#EE5156" />
          <Stop offset="1" stopColor="#F38488" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
