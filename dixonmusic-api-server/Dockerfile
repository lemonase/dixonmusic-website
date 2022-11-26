FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

COPY ./.env /code/.env

COPY ./app /code/app

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

ENV PORT="8033"

CMD  uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
