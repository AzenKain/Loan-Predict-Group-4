from fastapi import FastAPI, Request
import logging
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import pandas as pd
from xgboost import XGBClassifier

random_forest = joblib.load("random_forest_model.joblib")
xgboost_model = XGBClassifier()
xgboost_model.load_model("xgb_model.json")

original_features = [
    'Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed',
    'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio',
    'HasMortgage', 'HasDependents', 'HasCoSigner',
    "Bachelor's", 'High School', "Master's", 'PhD',
    'Full-time', 'Part-time', 'Self-employed', 'Unemployed',
    'Divorced', 'Married', 'Single', 'Auto', 'Business',
    'Education', 'Home', 'Other'
]

onehot_features = ['Education', 'EmploymentType', 'MaritalStatus', 'LoanPurpose']
label_encoded_features = ['HasMortgage', 'HasDependents', 'HasCoSigner']

onehot_mappings = {
    "Education": ["High School", "Bachelor's", "Master's", "PhD"],
    "EmploymentType": ["Unemployed", "Self-employed", "Part-time", "Full-time"],
    "MaritalStatus": ["Single", "Married", "Divorced"],
    "LoanPurpose": ["Auto", "Business", "Education", "Home", "Other"]
}

label_mappings = {
    "HasMortgage": {"No": 0, "Yes": 1},
    "HasDependents": {"No": 0, "Yes": 1},
    "HasCoSigner": {"No": 0, "Yes": 1}
}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/predict")
async def handler_predict(request: Request):
    try:
        req_json = await request.json()
        df = pd.DataFrame([req_json])

        for feature in onehot_features:
            for category in onehot_mappings[feature]:
                df[category] = (df[feature] == category).astype(int)

        df.drop(columns=onehot_features, inplace=True)

        for feature in label_encoded_features:
            df[feature] = df[feature].map(label_mappings[feature])

        df = df.reindex(columns=original_features, fill_value=0)

        input_data = df.values.astype(float)
        dt_prediction = random_forest.predict(input_data).tolist()
        xgb_prediction = xgboost_model.predict(input_data).tolist()

        return {
            "random_forest_prediction": dt_prediction,
            "xgboost_prediction": xgb_prediction
        }

    except Exception as err:
        print(f'Could not process REQUEST: {err}')
        return {"status": "ERR"}


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
