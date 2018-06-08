module SearchParams
  extend ActiveSupport::Concern

  def scores_list_params
    {  words: words, sort: scores_list_sort_option, order: order, options: scores_list_options }
  end  

  def users_list_params
    { words: words, sort: users_list_sort_option, order: order, options: users_list_options }
  end

  def users_favs_list_params
    users_list_params
  end

  def users_scores_list_params
    users_list_params.merge(
      owner: params[:user_name] == current_user&.name
    )
  end

  private

  def words
    params[:word]&.split(" ")
  end

  def order
    params[:sort]&.slice(/(asc|desc)$/) || "desc"
  end

  def sanitize_sort_option(options, default_option = "id")  
    option = params[:sort]&.gsub(/_(asc|desc)$/, "")
    options.include?(option) ? option : default_option
  end

  def scores_list_sort_option
    sanitize_sort_option(%w(updated_at title views_count favs_count))
  end

  def users_list_sort_option
    sanitize_sort_option(%w(updated_at screen_name scores_count))
  end

  def scores_list_options
    { guest: params[:guest] == "true" }
  end

  def users_list_options
    { no_scores: params[:no_scores] == "true" }
  end
end
