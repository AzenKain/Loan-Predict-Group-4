"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function InputForm() {
  const [annualInc, setAnnualInc] = useState<number>(65550);
  const [pubRec, setPubRec] = useState<number>(0);
  const [ficoAvg, setFicoAvg] = useState<number>(682);
  const [subGrade, setSubGrade] = useState<string>("A1");
  const [homeOwnership, setHomeOwnership] = useState<string>("MORTGAGE");
  const [applicationType, setApplicationType] = useState<string>("Individual");
  const [loanAmnt, setLoanAmnt] = useState<number>(15320);
  const [mortAcc, setMortAcc] = useState<number>(0);
  const [intRate, setIntRate] = useState<number>(15);
  const [installment, setInstallment] = useState<number>(389.98);
  const [fundedAmntInv, setFundedAmntInv] = useState<number>(13975);
  const [dti, setDti] = useState<number>(17.8);
  const [openAcc, setOpenAcc] = useState<number>(10);
  const [pubRecBankruptcies, setPubRecBankruptcies] = useState<number>(0);
  const [purpose, setPurpose] = useState<string>("debt_consolidation");
  const [term, setTerm] = useState<number>(36);
  const [revolBal, setRevolBal] = useState<number>(9816);
  const [revolUtil, setRevolUtil] = useState<number>(55);
  const [verificationStatus, setVerificationStatus] = useState<string>("Source Verified");
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<Record<string, number>>({})

  const validateForm = () => {

    if (isNaN(annualInc) || annualInc <= 0) return "Thu nhập hàng năm không phải là một số lớn hơn 0.";
    if (isNaN(pubRec) || pubRec < 0) return "Số hồ sơ công khai không phải là một số không âm.";
    if (isNaN(ficoAvg) || ficoAvg < 0 || ficoAvg > 850) return "Fico average phải là một số trong khoảng 0-850.";
    if (isNaN(loanAmnt) || loanAmnt <= 0) return "Số tiền vay phải là một số lớn hơn 0.";
    if (isNaN(mortAcc) || mortAcc < 0) return "Số tài khoản thế chấp phải là một số không âm.";
    if (isNaN(fundedAmntInv) || fundedAmntInv <= 0) return "Số tiền đầu tư phải là một số lớn hơn 0.";
    if (isNaN(dti) || dti < 0) return "Debt-to-income ratio phải là một số không âm.";
    if (isNaN(openAcc) || openAcc < 0) return "Số tài khoản mở không phải là một số không âm.";
    if (isNaN(pubRecBankruptcies) || pubRecBankruptcies < 0) return "Số hồ sơ phá sản không phải là một số không âm.";
    if (isNaN(revolBal) || revolBal < 0) return "Số dư thẻ tín dụng không phải là một số không âm.";
    if (isNaN(revolUtil) || revolUtil < 0) return "Tỷ lệ sử dụng tín dụng phải là một số trong khoảng 0-100.";
    if (isNaN(intRate) || intRate < 0) return "Lái suất cho vay không phải là một số không âm.";
    if (isNaN(installment) || installment < 0) return "Số tiền phải trả không phải là một số không âm.";

    return null;
  };

  const handleSubmit = async () => {

    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
    const data = {
      annual_inc: annualInc,
      pub_rec: pubRec,
      fico: ficoAvg,
      sub_grade: subGrade,
      home_ownership: homeOwnership,
      application_type: applicationType,
      loan_amnt: loanAmnt,
      int_rate: intRate,
      installment: installment,
      mort_acc: mortAcc,
      funded_amnt_inv: fundedAmntInv,
      dti: dti,
      open_acc: openAcc,
      pub_rec_bankruptcies: pubRecBankruptcies,
      purpose: purpose,
      term: term,
      revol_bal: revolBal,
      revol_util: revolUtil,
      verification_status: verificationStatus,
    };

    try {
      setIsLoading(true)
      const response = await axios.post(
        `https://apilp.kain.id.vn/predict`,
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",

          },
        },
      );
      setIsLoading(false)
      if (!response.data) {
        setData({})
        modal?.close()
        alert("Server không phản hồi!")
      }
      setData(response.data)
    } catch (error) {
      console.error("Error fetching user: ", error);
      modal?.close()
      setIsLoading(false)
      throw error;
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 top-0 z-10 fixed">
        <div className="flex-1">
          <a className="btn btn-ghost gap-0 text-[#8DC496] no-underline hover:no-underline font-bold text-2xl">
            Ka
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-orange-500 to-red-500">
              in
            </span>
          </a>
        </div>
        <div className="flex-none">

          <Link className='btn btn-ghost btn-circle' href={"https://github.com/AzenKain/Lending-club-predict"}>
            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
          </Link>
          {/* <>nah</> */}

        </div>
      </div>
      <div className="flex flex-col justify-center items-center mx-4 md:mx-8 lg:mx-24 mt-16">

        <div className="text-4xl mb-4 font-semibold text-cyan-500"> Dự đoán với tôi! </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

          <div>
            <label className="block">Xếp hạng khoản vay</label>
            <select
              value={subGrade}
              onChange={(e) => setSubGrade(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Chọn xếp hạng
              </option>
              {[
                'A1', 'A2', 'A3', 'A4', 'A5',
                'B1', 'B2', 'B3', 'B4', 'B5',
                'C1', 'C2', 'C3', 'C4', 'C5',
                'D1', 'D2', 'D3', 'D4', 'D5',
                'E1', 'E2', 'E3', 'E4', 'E5',
                'F1', 'F2', 'F3', 'F4', 'F5',
                'G1', 'G2', 'G3', 'G4', 'G5'
              ].map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Xác minh thu nhập</label>
            <select
              value={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Chọn trạng thái xác minh
              </option>
              <option value="Source Verified">Đã xác minh nguồn</option>
              <option value="Not Verified">Chưa xác minh</option>
              <option value="Verified">Đã xác minh</option>
            </select>
          </div>

          <div>
            <label className="block">Chế độ sở hưu nhà</label>
            <select
              value={homeOwnership}
              onChange={(e) => setHomeOwnership(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Chọn chế độ sở hữu
              </option>
              <option value="MORTGAGE">Thế chấp</option>
              <option value="RENT">Thuê</option>
              <option value="OWN">Sở hữu</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>

          <div>
            <label className="block">Loại hình cho vay</label>
            <select
              value={applicationType}
              onChange={(e) => setApplicationType(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Chọn loại hình
              </option>
              <option value="Individual">Cá nhân</option>
              <option value="Joint App">Tập thể</option>
            </select>
          </div>
          <div>
            <label className="block">Mục đích vay</label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Chọn mục đích vay
              </option>
              <option value="credit_card">Thẻ tín dụng</option>
              <option value="home_improvement">Cải thiện nhà</option>
              <option value="major_purchase">Mua sắm lớn</option>
              <option value="medical">Y tế</option>
              <option value="small_business">Kinh doanh nhỏ</option>
              <option value="car">Mua xe</option>
              <option value="vacation">Kỳ nghỉ</option>
              <option value="moving">Chuyển nhà</option>
              <option value="house">Nhà</option>
              <option value="wedding">Đám cưới</option>
              <option value="renewable_energy">Năng lượng tái tạo</option>
              <option value="educational">Giáo dục</option>
              <option value="other">Khác</option>
            </select>
          </div>


          <div>
            <label className="block">Kỳ hạn thanh toán</label>
            <select
              value={term}
              onChange={(e) => setTerm(parseInt(e.target.value))}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Kỳ hạn thanh toán
              </option>
              <option value="36">36 tháng</option>
              <option value="60">60 tháng</option>
            </select>
          </div>

          <div>
            <label className="block">Số tiền vay $</label>
            <input
              type="text"
              value={loanAmnt}
              onChange={(e) => setLoanAmnt(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter loan amount"
            />
          </div>
          <div>
            <label className="block">Lái suất %</label>
            <input
              type="text"
              value={intRate}
              onChange={(e) => setIntRate(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter loan amount"
            />
          </div>
          <div>
            <label className="block">Số tiền phải trả hàng tháng $</label>
            <input
              type="text"
              value={installment}
              onChange={(e) => setInstallment(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter loan amount"
            />
          </div>
          <div>
            <label className="block">Thu nhập hàng năm $</label>
            <input
              type="number"
              value={annualInc}
              onChange={(e) => setAnnualInc(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter your annual income"
            />
          </div>

          <div>
            <label className="block">Điểm FICO trung bình</label>
            <input
              type="number"
              value={ficoAvg}
              onChange={(e) => setFicoAvg(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter FICO score"
            />
          </div>

          <div>
            <label className="block">Số khoản thế chấp</label>
            <input
              type="number"
              value={mortAcc}
              onChange={(e) => setMortAcc(parseInt(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter mort accounts"
            />
          </div>

          <div>
            <label className="block">Số tiền cam kết đầu tư</label>
            <input
              type="number"
              value={fundedAmntInv}
              onChange={(e) => setFundedAmntInv(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter funded amount invested"
            />
          </div>

          <div>
            <label className="block">Tỉ lệ số nợ trên thu nhập %</label>
            <input
              type="number"
              value={dti}
              onChange={(e) => setDti(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter debt-to-income ratio"
            />
          </div>

          <div>
            <label className="block">Số các khoản tín dụng đang mở</label>
            <input
              type="number"
              value={openAcc}
              onChange={(e) => setOpenAcc(parseInt(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter open accounts"
            />
          </div>
          <div>
            <label className="block">Số lượng hồ sơ xấu công khai</label>
            <input
              type="number"
              value={pubRec}
              onChange={(e) => setPubRec(parseInt(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter public records count"
            />
          </div>

          <div>
            <label className="block">Số lượng hồ sơ phá sản công khai</label>
            <input
              type="number"
              value={pubRecBankruptcies}
              onChange={(e) => setPubRecBankruptcies(parseInt(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter public record bankruptcies"
            />
          </div>



          <div>
            <label className="block">Tổng số dư tín dụng quay vòng</label>
            <input
              type="number"
              value={revolBal}
              onChange={(e) => setRevolBal(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter revolving balance"
            />
          </div>

          <div>
            <label className="block">Tỉ lệ sử dụng tín dụng quay vòng %</label>
            <input
              type="number"
              value={revolUtil}
              onChange={(e) => setRevolUtil(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter revolving utilization"
            />
          </div>
        </div>
        <div onClick={async () => await handleSubmit()} className="btn btn-success mt-4 w-48 text-xl">
          Dự đoán
        </div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-white shadow-lg p-8 rounded-lg max-w-md">
            <form method="dialog">
              <button className="btn btn-sm btn-error btn-circle border absolute right-4 top-4 text-gray-500 hover:text-gray-800">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-2xl text-center text-cyan-500 mb-6">Dự đoán!</h3>
            {isLoading ? (
              <>
                <p className="py-4 text-xl text-gray-700 text-center">Chờ mình chút nhé!</p>
                <div className="relative flex justify-center items-center">
                  <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                  <Image
                    src="https://www.svgrepo.com/show/509003/avatar-thinking-6.svg"
                    width={220}
                    height={220}
                    alt="Loading"
                    className="rounded-full h-28 w-28"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="text-xl  text-gray-800">
                  <div className="mb-4">
                    {data["xgb_prediction"] < 0.5 ? (
                      <span className="text-red-600 font-semibold">Người vay có thể không trả được nợ!</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Người vay có thể trả được nợ!</span>
                    )}
                  </div>

                </div>
              </>
            )}
          </div>
        </dialog>

      </div>
      <div>
        <footer className="footer footer-center bg-base-300 text-base-content p-4 bg-transparent">
          <aside>
            <p className='font-bold text-lg'>Copyright © {new Date().getFullYear()} -  Kain (Powered by Nextjs & DaisyUi)</p>
          </aside>
        </footer>

      </div>
    </div>
  );
}
