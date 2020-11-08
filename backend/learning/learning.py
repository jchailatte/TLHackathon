# set the matplotlib backend so figures can be saved in the background
import matplotlib
matplotlib.use("Agg")
# import the necessary packages
from sklearn.preprocessing import LabelBinarizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import SGD
import matplotlib.pyplot as plt
import numpy as np
import argparse
import random
import pickle
import os

INIT_LR = 0.01
EPOCHS = 200
BS = 32

# fix random seed for reproducibility
np.random.seed(7)
# load matches dataset
parsed_matches_path = os.path.join(os.path.dirname(__file__), './parsed_matches.csv')
dataset = np.loadtxt(parsed_matches_path, delimiter=",")
# split into data and labels variables
data = dataset[:,0:86]
labels = dataset[:,86]

(trainX, testX, trainY, testY) = train_test_split(data,
	labels, test_size=0.001, random_state=42)


model = Sequential()
model.add(Dense(64, input_dim=86, activation='relu'))
# model.add(Dropout(0.1))
model.add(Dense(32, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

# binary_crossentropy or categorical_crossentropy
model.compile(loss="binary_crossentropy", optimizer='adam',
	metrics=["accuracy"])

# Fit the model
H = model.fit(x=trainX, y=trainY, validation_data=(testX, testY),
	epochs=EPOCHS, batch_size=BS, verbose=1)

predictions = model.predict(testX)

for i in range(10):
	print('{} => \t{} \npercent chance to be {} (correct {})'.format(testX[i].tolist(), predictions[i][0], int(predictions[i]), testY[i]))

model.save('model_5v5.h5')