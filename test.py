import os
import pandas as pd
from joblib import load
from sklearn.preprocessing import LabelEncoder

# INFILTERATION
# Label Encodings:
# Benign: 0
# Infilteration: 1

# DDOS UDP
# Label Encodings:
# Benign: 0
# DDOS attack-HOIC: 1
# DDOS attack-LOIC-UDP: 2

# BRUTEFORCE SQL INJECTION
# Label Encodings:
# Benign: 0
# Brute Force -Web: 1
# Brute Force -XSS: 2
# SQL Injection: 3

# BOT ATTACK
# Label Encodings:
# Benign: 0
# Bot: 1

label_encoder = LabelEncoder()

# Load the DataFrame
df = pd.read_csv('outside_env.csv')
directory = "models"
files = os.listdir(directory)

# Filter out files with the ".joblib" extension
model_files = [file for file in files if file.endswith(".joblib")]

# Define the features used for prediction
features = ['protocol', 'flow_duration', 'tot_fwd_pkts', 'tot_bwd_pkts', 'totlen_fwd_pkts', 'totlen_bwd_pkts',
            'fwd_pkt_len_mean', 'fwd_pkt_len_std', 'bwd_pkt_len_mean', 'flow_byts_s', 'flow_pkts_s',
            'flow_iat_std', 'flow_iat_min', 'fwd_iat_tot', 'fwd_iat_min', 'bwd_iat_tot', 'bwd_iat_min',
            'fwd_psh_flags', 'fwd_urg_flags', 'bwd_pkts_s', 'fin_flag_cnt', 'rst_flag_cnt', 'psh_flag_cnt',
            'ack_flag_cnt', 'urg_flag_cnt', 'down_up_ratio', 'init_fwd_win_byts', 'init_bwd_win_byts',
            'fwd_seg_size_min', 'active_mean', 'idle_mean']

# Iterate through each model file
for model_file in model_files:
    # Load the model
    loaded_model = load(model_file)
    
    # Make predictions
    predictions = loaded_model.predict(df[features])
    
    # Print the predictions
    print(f"Model: {model_file}")
    print(predictions)
    # predicted_labels = label_encoder.inverse_transform(predictions)
    print("\n")
