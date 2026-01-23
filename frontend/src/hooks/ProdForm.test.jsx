import { describe, expect, it, vi } from "vitest";
import { act } from "@testing-library/react";
import { renderHookWithProviders } from "../mocks/utils";
import { useProdForm } from "./useProdForm";

// vi.mock("react-toastify", async (importOriginal) => {
//   const mod = await importOriginal();
//   return {
//     ...mod,
//     toast: {
//       ...mod.toast, // 保留其他屬性
//       success: vi.fn(),
//       error: vi.fn(),
//     },
//   };
// });

const mockValidator = vi.fn();
const mockMutation = vi.fn();
describe("useProdForm 環境整合", () => {
  it("應該可以在Redux/Router環境中成功初始化", () => {
    const { result } = renderHookWithProviders(() =>
      useProdForm({
        mode: "creature",
        validator: mockValidator,
        mutation: mockMutation,
      }),
    );
    expect(result.current.category).toBe("");
  });

  describe("狀態整合與重置", () => {
    it("應該可以新增狀態並透過 resetState 重置所有資料", () => {
      const { result } = renderHookWithProviders(() =>
        useProdForm({
          mode: "creature",
          validator: mockValidator,
          mutation: mockMutation,
        }),
      );

      act(() => {
        result.current.setCategory("Man");
        result.current.setSubCategory("shoes");
        result.current.setSize({ S: 1, M: 2, L: 3 });
        result.current.setImgs([{ img: "new.jpg", isOld: false }]);
      });
      // 2. 驗證狀態是否更新
      expect(result.current.category).toBe("Man");
      expect(result.current.subCategory).toBe("shoes");
      expect(result.current.size).toEqual({ S: 1, M: 2, L: 3 });
      expect(result.current.imgs).toHaveLength(1);

      act(() => {
        result.current.resetState();
      });

      expect(result.current.category).toBe("");
      expect(result.current.subCategory).toBe("");
      expect(result.current.size).toEqual({ S: 0, M: 0, L: 0 });
      expect(result.current.imgs).toHaveLength(0);
      expect(result.current.resetUpload).toBe(true);
    });
  });

  describe("驗證編輯邏輯", () => {
    it("應該可以回填資料並格式化舊圖片", () => {
      const initData = {
        _id: "prod_123",
        mainCategory: "Women",
        subCategory: "Dress",
        size: { S: 5, M: 5, L: 5 },
        images: [
          { url: "https://example.com/img1.jpg", alt: "img1", _id: "1233" },
        ],
      };

      const { result } = renderHookWithProviders(() =>
        useProdForm({
          mode: "edit",
          initData,
          validator: mockValidator,
          mutation: mockMutation,
        }),
      );

      expect(result.current.imgs).toHaveLength(1);
      expect(result.current.imgs[0].isOld).toBe(true);

      //新增新圖片
      const file = new File(["(new)"], "new.png", { type: "image/png" });
      act(() => {
        const currentImgs = result.current.imgs;

        const newImgs = {
          url: "blob:http....",
          isOld: false,
          img: file,
          alt: "",
        };

        result.current.setImgs([...currentImgs, newImgs]);
      });
      //驗證目前的圖片是否有兩張(新與舊)
      expect(result.current.imgs).toHaveLength(2);

      //驗證第一張是舊圖
      expect(result.current.imgs[0]).toMatchObject({
        url: "https://example.com/img1.jpg",
        isOld: true,
        img: null,
      });

      //驗證第二張是新圖
      expect(result.current.imgs[1]).toMatchObject({
        isOld: false,
        img: file,
      });

      expect(result.current.category).toBe("Women");
      expect(result.current.subCategory).toBe("Dress");
      expect(result.current.size).toEqual({ S: 5, M: 5, L: 5 });
    });
  });
});
