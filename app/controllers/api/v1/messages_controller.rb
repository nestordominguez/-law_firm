class Api::V1::MessagesController < Api::V1::CoreController
  before_action :set_message, only: [:show, :edit, :destroy]
  before_action :authenticate_user!, only: [:index, :show, :destroy]

  def index
    # if authorized?
      respond_with body: Message.all
    # else
    #   respond_with error: unauthorized
    # end
  end

  def show
    if authorized?
      @message.read = "Si"
      @message.save
      respond_with body: @message
    else
      respond_with error: unauthorized
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
    if authorized?
      respond_to do |format|
        if @message.destroy
          format.json { head :no_content, status: :ok }
        else
          format.json { render json: @message.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_with error: unauthorized
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
