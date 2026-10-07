import { describe, expect, it } from "vitest";
import { AD_CSV_HEADERS, adsToCsv, escapeCsvCell, neutralizeFormula, toCsv } from "@/lib/csv";
import { ads, offers } from "@/data/mock-data";

describe("neutralização de fórmulas", () => {
  it.each(["=SUM(A1)", "+1+1", "-2+3", "@cmd", "\tx", "\rx"])("prefixa apóstrofo em %j", (v) => {
    expect(neutralizeFormula(v)).toBe(`'${v}`);
  });
  it("mantém valores comuns", () => {
    expect(neutralizeFormula("Saiba mais")).toBe("Saiba mais");
    expect(neutralizeFormula("a=b")).toBe("a=b");
  });
});

describe("escapeCsvCell", () => {
  it("escapa aspas, vírgulas e quebras de linha", () => {
    expect(escapeCsvCell('Diga "olá"')).toBe('"Diga ""olá"""');
    expect(escapeCsvCell("a,b")).toBe('"a,b"');
    expect(escapeCsvCell("linha1\nlinha2")).toBe('"linha1\nlinha2"');
  });
  it("neutraliza e escapa ao mesmo tempo", () => {
    expect(escapeCsvCell('=HYPERLINK("x","y")')).toBe(`"'=HYPERLINK(""x"",""y"")"`);
  });
  it("converte nulos em vazio", () => {
    expect(escapeCsvCell(null)).toBe("");
    expect(escapeCsvCell(undefined)).toBe("");
    expect(escapeCsvCell(12)).toBe("12");
  });
});

describe("toCsv / adsToCsv", () => {
  it("monta linhas separadas por CRLF", () => {
    expect(toCsv([["a", "b"], ["=1", "c,d"]])).toBe("a,b\r\n'=1,\"c,d\"");
  });
  it("gera cabeçalho e uma linha por anúncio", () => {
    const sample = ads.slice(0, 3);
    const lines = adsToCsv(sample, offers).split("\r\n");
    expect(lines[0]).toBe(AD_CSV_HEADERS.join(","));
    expect(lines).toHaveLength(4);
    expect(lines[1]?.startsWith(`${sample[0]?.id},`)).toBe(true);
  });
  it("neutraliza fórmulas vindas dos dados", () => {
    const base = ads[0]!;
    const csv = adsToCsv([{ ...base, copy: "=cmd|'/C calc'!A0", advertiser: "@evil" }], offers);
    expect(csv).toContain("'=cmd|'/C calc'!A0");
    expect(csv).toContain("'@evil");
    expect(csv).not.toMatch(/,=cmd/);
  });
});
