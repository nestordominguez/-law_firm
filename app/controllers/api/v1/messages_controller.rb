class Api::V1::MessagesController < Api::V1::CoreController
  before_action :set_message, only: [:show, :edit, :destroy]
  before_action :authenticate_user!, only: [:index, :show, :destroy]

  def index
    respond_to do |format|
      if authorized?
        format.json { render json: Message.all, status: :ok }
      else
        format.json { render json: unauthorized, status: :forbidden}
      end
    end
  end

  def show
    respond_to do |format|
      if authorized?
        @message.read = "Si"
        @message.save
        format.json { render json: @message, status: :ok }
      else
        format.json { render json: unauthorized, status: :forbidden }
      end
    end
  end

  def create
    @message = Message.new(message_params)
    respond_to do |format|
      if @message.save
        format.json { render json: @message, status: :created }
      else
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      if authorized?
        format.json { head :no_content, status: :ok }
      else
        format.json { render json: unauthorized, status: :forbidden }
      end
    end
  end

  private

  def set_message
    @message = Message.find(params[:id])
  end

  def message_params
    params[:message].permit(:name, :email, :phone, :content)
  end
end
