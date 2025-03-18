"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function InputForm() {
  const [age, setAge] = useState<number>(29);
  const [income, setIncome] = useState<number>(66812);
  const [loanAmount, setLoanAmount] = useState<number>(25657);
  const [creditScore, setCreditScore] = useState<number>(837);
  const [monthsEmployed, setMonthsEmployed] = useState<number>(102);
  const [numCreditLines, setNumCreditLines] = useState<number>(1);
  const [interestRate, setInterestRate] = useState<number>(21.69);
  const [loanTerm, setLoanTerm] = useState<number>(12);
  const [dtiRatio, setDtiRatio] = useState<number>(0.42);
  const [education, setEducation] = useState<string>("High School");
  const [employmentType, setEmploymentType] = useState<string>("Unemployed");
  const [maritalStatus, setMaritalStatus] = useState<string>("Single");
  const [hasMortgage, setHasMortgage] = useState<string>("Yes");
  const [hasDependents, setHasDependents] = useState<string>("No");
  const [loanPurpose, setLoanPurpose] = useState<string>("Auto");
  const [hasCoSigner, setHasCoSigner] = useState<string>("No");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Record<string, number>>({});

  const validateForm = () => {
    if (isNaN(age) || age <= 0) return "Tuổi không phải là một số lớn hơn 0.";
    if (isNaN(income) || income < 0) return "Thu nhập không phải là một số không âm.";
    if (isNaN(loanAmount) || loanAmount <= 0) return "Số tiền vay phải là một số lớn hơn 0.";
    if (isNaN(creditScore) || creditScore < 300 || creditScore > 850) return "Điểm tín dụng phải là một số trong khoảng 300-850.";
    if (isNaN(monthsEmployed) || monthsEmployed < 0) return "Số tháng làm việc phải là một số không âm.";
    if (isNaN(numCreditLines) || numCreditLines < 0) return "Số dòng tín dụng phải là một số không âm.";
    if (isNaN(interestRate) || interestRate < 0) return "Lãi suất cho vay không phải là một số không âm.";
    if (isNaN(loanTerm) || loanTerm <= 0) return "Kỳ hạn vay phải là một số lớn hơn 0.";
    if (isNaN(dtiRatio) || dtiRatio < 0 || dtiRatio > 1) return "Tỷ lệ DTI phải là một số trong khoảng 0-1.";

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
      Age: age,
      Income: income,
      LoanAmount: loanAmount,
      CreditScore: creditScore,
      MonthsEmployed: monthsEmployed,
      NumCreditLines: numCreditLines,
      InterestRate: interestRate,
      LoanTerm: loanTerm,
      DTIRatio: dtiRatio,
      Education: education,
      EmploymentType: employmentType,
      MaritalStatus: maritalStatus,
      HasMortgage: hasMortgage,
      HasDependents: hasDependents,
      LoanPurpose: loanPurpose,
      HasCoSigner: hasCoSigner,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://apilp.kain.id.vn/predict`,
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setIsLoading(false);
      if (!response.data) {
        setData({});
        modal?.close();
        alert("Server không phản hồi!");
      }
      setData(response.data);
    } catch (error) {
      console.error("Error fetching prediction: ", error);
      modal?.close();
      setIsLoading(false);
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
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mx-4 md:mx-8 lg:mx-24 mt-16">
        <div className="text-4xl mb-4 font-semibold text-cyan-500">Dự đoán với nhóm mình!</div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block">Tuổi</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Nhập tuổi"
            />
          </div>

          <div>
            <label className="block">Thu nhập $</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Nhập thu nhập"
            />
          </div>

          <div>
            <label className="block">Số tiền vay $</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Nhập số tiền vay"
            />
          </div>

          <div>
            <label className="block">Điểm tín dụng</label>
            <input
              type="number"
              value={creditScore}
              onChange={(e) => setCreditScore(parseInt(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Nhập điểm tín dụng"
            />
          </div>

          <div>
            <label className="block">Số tháng làm việc</label>
            <input
              type="number"
              value={monthsEmployed}
              onChange={(e) => setMonthsEmployed(parseInt(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Nhập số tháng làm việc"
            />
          </div>

          <div>
            <label className="block">Số dòng tín dụng</label>
            <input
              type="number"
              value={numCreditLines}
              onChange={(e) => setNumCreditLines(parseInt(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Nhập số dòng tín dụng"
            />
          </div>

          <div>
            <label className="block">Lãi suất %</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Nhập lãi suất"
            />
          </div>

          <div>
            <label className="block">Kỳ hạn vay (tháng)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseInt(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Nhập kỳ hạn vay"
            />
          </div>

          <div>
            <label className="block">Tỷ lệ nợ trên thu nhập</label>
            <input
              type="number"
              step="0.01"
              value={dtiRatio}
              onChange={(e) => setDtiRatio(parseFloat(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Nhập tỷ lệ DTI"
            />
          </div>

          <div>
            <label className="block">Trình độ học vấn</label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="High School">Trung học phổ thông</option>
              <option value="Bachelor">Cử nhân</option>
              <option value="Master">Thạc sĩ</option>
              <option value="PhD">Tiến sĩ</option>
              <option value="None">Không có</option>
            </select>
          </div>

          <div>
            <label className="block">Loại hình việc làm</label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="Full-time">Toàn thời gian</option>
              <option value="Part-time">Bán thời gian</option>
              <option value="Self-employed">Tự kinh doanh</option>
              <option value="Unemployed">Thất nghiệp</option>
            </select>
          </div>

          <div>
            <label className="block">Tình trạng hôn nhân</label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="Single">Độc thân</option>
              <option value="Married">Đã kết hôn</option>
              <option value="Divorced">Ly hôn</option>
              <option value="Widowed">Góa phụ</option>
            </select>
          </div>

          <div>
            <label className="block">Có thế chấp không?</label>
            <select
              value={hasMortgage}
              onChange={(e) => setHasMortgage(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="Yes">Có</option>
              <option value="No">Không</option>
            </select>
          </div>

          <div>
            <label className="block">Có người phụ thuộc không?</label>
            <select
              value={hasDependents}
              onChange={(e) => setHasDependents(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="Yes">Có</option>
              <option value="No">Không</option>
            </select>
          </div>

          <div>
            <label className="block">Mục đích vay</label>
            <select
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="Auto">Mua xe</option>
              <option value="Home">Mua nhà</option>
              <option value="Education">Giáo dục</option>
              <option value="Medical">Y tế</option>
              <option value="Debt">Trả nợ</option>
              <option value="Business">Kinh doanh</option>
              <option value="Other">Khác</option>
            </select>
          </div>

          <div>
            <label className="block">Có người đồng vay không?</label>
            <select
              value={hasCoSigner}
              onChange={(e) => setHasCoSigner(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="Yes">Có</option>
              <option value="No">Không</option>
            </select>
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
                <div className="text-xl text-gray-800">
                  <div className="mb-4">
                    {data["xgboost_prediction"][1] === 0 ? (
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
            <p className='font-bold text-lg'>Copyright © {new Date().getFullYear()} - Kain (Powered by Nextjs & DaisyUi)</p>
          </aside>
        </footer>
      </div>
    </div>
  );
}