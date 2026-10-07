import { describe, expect, it } from "vitest";
import { safeUrl } from "@/lib/safe-url";

describe("safeUrl", () => {
  it("aceita URLs https", () => {
    expect(safeUrl("https://exemplo.com/oferta?x=1")).toBe("https://exemplo.com/oferta?x=1");
    expect(safeUrl("  https://exemplo.com  ")).toBe("https://exemplo.com/");
  });
  it("rejeita outros protocolos", () => {
    for (const v of ["javascript:alert(1)", "JaVaScRiPt:alert(1)", "data:text/html,<b>x</b>", "http://exemplo.com", "ftp://exemplo.com", "vbscript:msgbox", "file:///etc/passwd"]) {
      expect(safeUrl(v)).toBeNull();
    }
  });
  it("rejeita valores inválidos ou vazios", () => {
    for (const v of ["", "   ", "exemplo.com", "/relativo", null, undefined, 42, {}]) expect(safeUrl(v)).toBeNull();
  });
});
